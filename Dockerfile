FROM node:16-slim

ENV NODE_ENV development
ENV EMBER_CLI_VERSION 4.8
ENV WATCHMAN_VERSION v4.9.0

WORKDIR /src

RUN \
  apt-get update -y &&\
  apt-get install -y --no-install-recommends \
    apt-transport-https \
    autoconf \
    automake \
    build-essential \
    ca-certificates \
    curl \
    git \
    gnupg \
    libssl-dev \
    libtool \
    pkg-config \
    python3

RUN \
  git clone https://github.com/facebook/watchman.git &&\
  cd watchman &&\
  git checkout ${WATCHMAN_VERSION} &&\
  ./autogen.sh &&\
  ./configure --without-python --without-pcre --enable-lenient &&\
  make &&\
  make install

RUN \
  echo 'PS1="\[\\e[0;94m\]${debian_chroot:+($debian_chroot)}\\u@\\h:\\w\\\\$\[\\e[m\] "' >> ~/.bashrc

RUN \
  yarn global add \
    ember-cli@${EMBER_CLI_VERSION}

COPY package.json yarn.lock ./
RUN yarn install
CMD npm run start
