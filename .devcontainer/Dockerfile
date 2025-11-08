# general
FROM debian:trixie
ENV DEBIAN_FRONTEND=noninteractive LANG=C.UTF-8

# download needed things
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git sudo openjdk-25-jdk mariadb-server mariadb-client && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# default sql data
COPY ./init-db.sh /usr/local/bin/init-db.sh
RUN chmod +x /usr/local/bin/init-db.sh

# user and workspace
RUN useradd -ms /bin/bash eedu && echo "eedu ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers

USER eedu
WORKDIR /home/eedu/ElementEDU
