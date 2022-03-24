FROM mcr.microsoft.com/playwright:v1.20.0-focal

ENV TZ=Asia/Shanghai

RUN cp -ra /etc/apt/sources.list /etc/apt/sources.list.bak
RUN sed -i "s/\(ports\|archive\|security\).ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list
RUN sed -i "/^#/d" /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y \
    g++ \
    make \
    unzip \
    libcurl4-openssl-dev\
    autoconf\
    libtool \
    cmake

WORKDIR /dependecies

COPY ./ ./

RUN npm config set registry https://registry.npm.taobao.org
RUN npm ci

# COPY ./entry_script.sh /entry_script.sh
# ADD aws-lambda-rie /usr/local/bin/aws-lambda-rie
# ENTRYPOINT [ "./entry_script.sh" ]

# x86-64
# ADD aws-lambda-rie-x86_64 /usr/local/bin/aws-lambda-rie
# ENTRYPOINT [ "./entry_script.sh" ]


# arm64
# COPY ./entry_script.sh /entry_script.sh
ADD aws-lambda-rie-arm64 /usr/local/bin/aws-lambda-rie
ENTRYPOINT [ "./entry_script.sh" ]

# ENTRYPOINT ["node_modules/.bin/aws-lambda-ric"]
CMD ["handler.runTest"]