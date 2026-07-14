# Nam Hoàng — Portfolio

Website tĩnh (HTML/CSS/JS thuần), sẵn sàng deploy lên Vercel.

## Cấu trúc file

```
index.html                 → trang chủ (hero, work grid, about, contact)
style.css                  → toàn bộ style, dùng chung cho mọi trang
script.js                  → mobile nav toggle, parallax nhẹ
globe.js                   → quả địa cầu chấm bi xoay trong hero (canvas, chỉ load ở index.html)
projects/documentary.html  → trang riêng cho video Documentary
projects/geopolitics.html  → trang riêng cho video Geopolitics
projects/infrastructure.html → trang riêng cho video Infrastructure
```

Mỗi video giờ có 1 trang riêng (nhúng video, mô tả đầy đủ, tab chuyển giữa 3 thể loại ở đầu trang). Từ trang chủ bấm vào 1 dự án sẽ mở trang riêng đó.

## Deploy lên Vercel (2 cách)

**Cách 1 — Kéo thả (nhanh nhất, không cần Git):**
1. Vào https://vercel.com/new
2. Kéo cả thư mục này vào ô upload
3. Deploy — xong, có link ngay

**Cách 2 — Qua GitHub (khuyên dùng để dễ cập nhật sau này):**
1. Tạo repo mới trên GitHub, push 3 file `index.html`, `style.css`, `script.js` lên
2. Vào https://vercel.com/new, chọn "Import Git Repository"
3. Chọn repo vừa tạo → Deploy (không cần chỉnh Build Command, đây là static site)

## Cần chỉnh trước khi public

- **Tiêu đề & mô tả 3 video trong phần "Dự án"** (`index.html`, đánh dấu `<!-- TODO -->`) — mình chỉ lấy được thumbnail từ link YouTube bạn gửi, chưa lấy được tiêu đề thật nên đang để tạm. Gửi mình tên thật của 3 video là mình điền lại chính xác.
- **Ảnh chân dung thật** ở phần "Giới thiệu" — hiện đang là khung chữ "NH" tạm thời, thay bằng ảnh của bạn trong thẻ `.photo-frame`.
- **Link mạng xã hội** ở footer nếu muốn thêm (X/Instagram/Behance...).
