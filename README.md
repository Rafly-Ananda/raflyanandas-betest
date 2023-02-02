# raflyanandas_betest

1. Mircoservice dibuat dengan menggunakan NodeJS dan Express, serta menggunakan MongoDB sebagai database dan redis untuk metode caching get user data.
2. CRUD API Route di lindungi dengan JWT token, generate JWT token dapat dilakukan dengan mengakses rute /api/v1/token
3. Dokumentasi Postman : **https://documenter.getpostman.com/view/18026245/2s935mqjJo**
4. Saya menggunakan strategi caching get request, untuk mempercepat proses get data user setelah data tersebut pertama kali di panggil, lama cache dapat ditentukan oleh variable pada **config.js** file.
5. Aplikasi telah di deploy dengan menggunakan service **DigitalOcean** dan **Docker**. Untuk mencoba aplikasi bisa dapat langsung mengakses URL **http://134.209.102.123**, atau dengan melakukan clone project dan menjalankan nya dengan Container.
   > **Note:** Untuk menjalankan project dengan docker local, pada file docker-compose.yml mohon untuk lakukan uncoment volume pada service **server** karena ini bertujuan untuk mount node_modules pada Docker container.
6. Microservices name, **Redis**, **MongoDB**, **NodeJS Server** sudah dinamai dengan menggunakan naming convention yang diharuskan.
7. Constarint database, saya melakukan indexing pada field **\_id**, **accountNumber**, serta **identityNumber** dikarenakan dari spesifikasi yang diberikan, **accountNumber** dan **identityNumber**, bisa digunakan secara independen sebagai parameter pencarian data. Dengan melakukan indexing, maka mongoDB dapat menyimpan serta menyusun data dengan efisien. untuk constraint database, seluruh field **\_id**, **username**, **accountNumber**, **identityNumber** tidak boleh **NULL** dan harus **UNIQUE**.
