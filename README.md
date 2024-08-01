# เริ่มต้นโปรเจค
- npm install -g @nestjs/cli
- nest new project-name
- cd project-name
- npm run start | npm run start:dev

# คำสั่งต่างๆ 
- nest new project-name                         สร้างโปรเจคใหม่
- nest --version                                เช็คเวอร์ชั่น
- npm run start                                 รันโปรเจค
- npm run start:dev                             รันโปรเจค เวลากดเซฟ จะสตาร์ทใหม่เอง
- nest generate module module-name              สร้าง module หากมี --no-spec จะไม่สร้างไฟล spec ขึ้นมา 
- nest generate controller controller-name      สร้าง controller หากมี --no-spec จะไม่สร้างไฟล spec ขึ้นมา 
- nest generate service service-name            สร้าง service หากมี --no-spec จะไม่สร้างไฟล spec ขึ้นมา 

**entity = จะคล้าย เป็นการ กำหนด ตาราง migration และ model ใน laravel

# dockerfile syntax
    - FROM                                          ระบุ base image ที่จะใช้เป็นพื้นฐานของ image ใหม่ เช่น FROM node:14 ใช้ base image ของ Node.js เวอร์ชัน 14
    - WORKDIR                                       ตั้งค่า working directory ภายใน container ซึ่งทุกคำสั่งที่ตามมาจะทำงานภายใน directory นี้
    - COPY                                          คัดลอกไฟล์หรือ directory จากเครื่องโฮสต์ไปยัง container
    - RUN                                           รันคำสั่งในระหว่างการสร้าง image เช่น การติดตั้ง dependencies
    - EXPOSE                                        เปิดพอร์ตที่ container จะใช้
    - ADD
    - CMD                                           ระบุคำสั่งที่ต้องการให้รันเมื่อ container เริ่มทำงาน
    - MAINTAINER

    ค.ย dockerfile
        FROM node:18

        WORKDIR /app

        COPY ./package.json ./
        COPY . .

        RUN npm install

        EXPOSE 3000

        CMD ["npm","run","start:dev"]

# คำสั่ง docker 
- docker build -t <image> .                                                             คำสั่งรัน dockerfile เป็น image
- docker compose up -d                                                                  คำสั่งรัน compose 
- docker compose up -d                                                                  คำสั่งรัน compose และ ทำงานเบื้องหลัง จะไม่มี log ให้ดู
- docker compose up -d --build                                                          คำสั่งรัน compose และ ทำงานเบื้องหลัง จะไม่มี log ให้ดู และสร้าง image ใหม่
- docker ps                                                                             คำสัง ดูว่า มี container ไหนที่ทำงานอยู่บ้าง
- docker ps -a                                                                          คำสัง ดูว่า มี container ไหนบ้าง
- docker --version                                                                      ตรวจสอบเวอร์ชันของ Docker:
- docker run --name <container-name> <image>                                            คำสังรัน image ให้เป็น containner
- docker logs <container-name>                                                          คำสั่งแสดง log ของ container นั้นๆ
- docker stats                                                                          คำสั่งดู ทรัพยากรว่า docker container ใช้อยู่เท่าไหร่
- docker stop <container-name>                                                          คำสั่งหยุดการทำงานของ container
- docker rm <container-name>                                                            คำสั่งลบ container
- docker inspect --format='{{.NetworkSettings.IPAddress}}' <container-name>             คำสั่งหา path ของ container
- docker inspect --format='{{.NetworkSettings.Ports}}' <container-name>                 คำสั่งหา port ของ container
- docker run --name <container-name> --network="host" <image>                           หากเป็น host path ของ container จะเป็น ของ host นั้นๆ 
- docker run --name <container-name> --network="bridge" <image>                         หากเป็น bridge path ของ container จะเป็น path เริ่มต้น ของ dcoker
- docker images                                                                         คำสั่งดู images ภายในเครื่องว่ามีอะไรบ้าง
- docker pull <image>                                                                   คำสั่ง โหลด image จาก docker hub มาบนเครื่อง
