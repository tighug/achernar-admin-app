import axios from "axios";

const api = axios.create({ baseURL: process.env.FLOW_API_URL });
const { cache } = window;

export type Feeder = {
  id: number;
  networkNum: number;
  feederNum: number;
};

export type Node = {
  id: number;
  feeder: Feeder;
  num: number;
  posX: number;
  posY: number;
  hasLoad: boolean;
};

export type Line = {
  id: number;
  prevNode: Node;
  nextNode: Node;
  lengthM: number;
  phase: number;
  code: string;
  rOhmPerKm: number;
  xOhmPerKm: number;
};

export type Case = {
  id: number;
  networkNum: number;
  feederNum: number;
  hour: number;
  minute: number;
  pvCount: number;
  pvScale: number;
  loadScale: number;
  baseV: number;
  seed: number;
  status: string;
};

export type RegisterCaseInput = {
  feederId: number;
  hour: number;
  minute: number;
  pvCount: number;
  pvScale: number;
  loadScale: number;
  baseV: number;
  seed: number;
};

export type Load = {
  id: number;
  case: Case;
  node: Node;
  val: number;
  type: string;
};

export type Flow = {
  id: number;
  line: Line;
  nextNodeP: number;
  nextNodeV: number;
  lineI: number;
};

export async function getFeeders(): Promise<Feeder[]> {
  const feeders = await cache.find<Feeder[] | undefined>("feeders");
  if (feeders === undefined) {
    const { data } = await api.get<{ feeders: Feeder[] }>("/feeders");
    await cache.save("feeders", data.feeders);
    return data.feeders;
  }
  return feeders;
}

export async function getNodes(feederId: number): Promise<Node[]> {
  const nodes = await cache.find<Node[] | undefined>(`nodes${feederId}`);
  if (nodes === undefined) {
    const { data } = await api.get<{ nodes: Node[] }>(
      `/feeders/${feederId}/nodes?fields=id,num,posX,posY,hasLoad`
    );
    await cache.save(`nodes${feederId}`, data.nodes);
    return data.nodes;
  }
  return nodes;
}

export async function getLines(feederId: number): Promise<Line[]> {
  const lines = await cache.find<Line[] | undefined>(`lines${feederId}`);
  if (lines === undefined) {
    const { data } = await api.get<{ lines: Line[] }>(
      `/feeders/${feederId}/lines?fields=id,prevNode,nextNode,num,lengthM,phase,code,rOhmPerKm,xOhmPerKm`
    );
    await cache.save(`lines${feederId}`, data.lines);
    return data.lines;
  }
  return lines;
}

export async function getCases(feederId: number): Promise<Case[]> {
  const { data } = await api.get<{ cases: Case[] }>(
    `/feeders/${feederId}/cases?fields=id,hour,minute,pvCount,pvScale,loadScale,seed,baseV,status`
  );
  return data.cases;
}

export async function registerCase(props: {
  feederId: number;
  hour: number;
  minute: number;
  pvCount: number;
  pvScale: number;
  loadScale: number;
  baseV: number;
  seed: number;
}): Promise<Case> {
  const { data } = await api.post<{ case: Case }>("/cases", props);
  return data.case;
}

export async function deleteCase(id: number): Promise<number> {
  await api.delete(`/cases/${id}`);
  return id;
}

export async function simCase(id: number): Promise<void> {
  await api.post(`/cases/${id}/jobs`);
}

export async function getLoads(caseId: number): Promise<Load[]> {
  const { data } = await api.get<{ loads: Load[] }>(
    `/cases/${caseId}/loads?type=load&fields=id,node,num,val`
  );
  return data.loads;
}

export async function getPVs(caseId: number): Promise<Load[]> {
  const { data } = await api.get<{ loads: Load[] }>(
    `/cases/${caseId}/loads?type=pv&fields=id,node,num,val`
  );
  return data.loads;
}

export async function getFlows(caseId: number): Promise<Flow[]> {
  const { data } = await api.get<{ flows: Flow[] }>(
    `/cases/${caseId}/flows?before=true&fields=id,line,nextNode,num,nextNodeP,nextNodeV,lineI`
  );
  return data.flows;
}
