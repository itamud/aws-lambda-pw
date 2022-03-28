FROM mcr.microsoft.com/playwright:v1.20.0-focal

ENV TZ=Asia/Shanghai

# RUN cp -ra /etc/apt/sources.list /etc/apt/sources.list.bak
# RUN sed -i "s/\(ports\|archive\|security\).ubuntu.com/mirrors.aliyun.com/g" /etc/apt/sources.list
# RUN sed -i "/^#/d" /etc/apt/sources.list
RUN apt-get update && \
    apt-get install -y \
    g++=4:9.3.0-1ubuntu2 \
    make=4.2.1-1.2 \
    unzip=6.0-25ubuntu1 \
    libcurl4-openssl-dev=7.68.0-1ubuntu2.7\
    autoconf=2.69-11.1\
    libtool=2.4.6-14 \
    cmake=3.16.3-1ubuntu1

WORKDIR /function

COPY ./ ./

RUN npm config set registry https://registry.npm.taobao.org
RUN npm ci && npm i --save aws-lambda-ric@2.0.0

# x86-64
ADD aws-lambda-rie /usr/local/bin/aws-lambda-rie
ENTRYPOINT [ "./entry_script.sh" ]


# ENTRYPOINT ["node_modules/.bin/aws-lambda-ric"]
CMD ["handler.runTest"]