ARG NODE_VERSION=14
FROM node:${NODE_VERSION}-buster-slim AS development
SHELL ["/bin/bash", "-o", "pipefail", "-c"]
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    exa \
    git \
    vim \
    zsh \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*
RUN curl -sSfLO https://github.com/sharkdp/bat/releases/download/v0.17.1/bat_0.17.1_amd64.deb \
    && dpkg -i bat_0.17.1_amd64.deb \
    && rm bat_0.17.1_amd64.deb
RUN curl -sSfL https://starship.rs/install.sh | bash -s - -y
RUN apt-get update && apt-get install -y --no-install-recommends \
    libasound2 \
    libdrm-dev \
    libgbm-dev \
    libgconf2-dev \
    libgtkextra-dev \
    libgtk-3-0 \
    libnss3 \
    libxss1 \
    libxtst-dev \
    libx11-xcb-dev \
    && apt-get -y clean \
    && rm -rf /var/lib/apt/lists/*
ENV QT_X11_NO_MITSHM=1
ENV DISPLAY=host.docker.internal:0.0