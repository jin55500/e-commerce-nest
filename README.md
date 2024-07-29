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

 