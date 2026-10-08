import { upload } from "@vercel/blob/client";

import "./style.css";


const app =
  document.getElementById("app");


app.innerHTML = `

<div class="page">

  <div class="stars"></div>

  <div class="anime-bg">

    <div class="moon"></div>

    <div class="character">

      <div class="hair-back"></div>

      <div class="head">

        <div class="hair-front"></div>

        <div class="eye eye-left"></div>
        <div class="eye eye-right"></div>

        <div class="nose"></div>

        <div class="mouth"></div>

      </div>

      <div class="neck"></div>

      <div class="body-anime"></div>

    </div>

    <div class="anime-copy">

      <div class="anime-title">
        AZERST
      </div>

      <div class="anime-sub">
        IMAGE HOSTING
      </div>

    </div>

  </div>


  <div class="panel">

    <header>

      <div class="brand">

        <img
          src="https://img-ffvn-tgm-com.vercel.app/images/3rYKxqbI.png"
          alt="Azerst"
        >

        <div>

          <h1>
            AZERST IMAGE
          </h1>

          <p>
            CÔNG CỤ CHÈN ẢNH TẠO LINK URL
          </p>

        </div>

      </div>

    </header>


    <div class="capacity">

      <span>
        DUNG LƯỢNG
      </span>

      <b>
        Tối Đa: 65 GB
      </b>

    </div>


    <label
      class="dropzone"
      id="dropzone"
    >

      <input
        id="file"
        type="file"
        accept=".png,.jpg,.jpeg,.webp,.gif,image/png,image/jpeg,image/webp,image/gif"
        hidden
      >

      <div class="upload-circle">
        ↑
      </div>

      <strong>
        CHÈN ẢNH
      </strong>

      <span>
        Nhấn để chọn ảnh
      </span>

      <small>
        PNG • JPG • JPEG • WEBP • GIF
      </small>

    </label>


    <section
      id="result"
      class="result hidden"
    >

      <div class="preview">

        <img
          id="preview"
          alt="Ảnh xem trước"
        >

      </div>


      <div class="information">

        <div>
          <span>Tên file</span>
          <b id="name">-</b>
        </div>

        <div>
          <span>Kích thước</span>
          <b id="size">-</b>
        </div>

        <div>
          <span>Định dạng</span>
          <b id="format">-</b>
        </div>

        <div>
          <span>Trạng thái</span>
          <b id="status">
            Đang chờ
          </b>
        </div>

      </div>


      <div class="progress-area">

        <div class="progress-label">

          <span>
            Đang tải lên
          </span>

          <b id="percent">
            0%
          </b>

        </div>

        <div class="progress">

          <div id="bar"></div>

        </div>

      </div>


      <div
        id="urlArea"
        class="url-area hidden"
      >

        <label>
          URL ẢNH TRỰC TIẾP
        </label>

        <div class="url-row">

          <input
            id="url"
            readonly
          >

          <button id="copy">
            COPY
          </button>

        </div>

      </div>


      <button
        id="again"
        class="again"
      >
        + CHÈN ẢNH KHÁC
      </button>

    </section>


    <div
      id="error"
      class="error hidden"
    ></div>


    <footer>
      AZERST IMAGE VN
    </footer>

  </div>

</div>

`;


const fileInput =
  document.getElementById("file");

const dropzone =
  document.getElementById("dropzone");

const result =
  document.getElementById("result");

const preview =
  document.getElementById("preview");

const nameElement =
  document.getElementById("name");

const sizeElement =
  document.getElementById("size");

const formatElement =
  document.getElementById("format");

const statusElement =
  document.getElementById("status");

const percent =
  document.getElementById("percent");

const bar =
  document.getElementById("bar");

const urlArea =
  document.getElementById("urlArea");

const urlInput =
  document.getElementById("url");

const errorElement =
  document.getElementById("error");

const copyButton =
  document.getElementById("copy");

const againButton =
  document.getElementById("again");


const allowed = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif"
];


function randomName() {

  const chars =
    "abcdefghijklmnopqrstuvwxyz0123456789";

  let name = "";

  for (
    let i = 0;
    i < 6;
    i++
  ) {

    name +=
      chars[
        Math.floor(
          Math.random() *
          chars.length
        )
      ];

  }

  return name;
}


function extension(file) {

  const type =
    file.type.toLowerCase();

  if (type === "image/png")
    return ".png";

  if (type === "image/webp")
    return ".webp";

  if (type === "image/gif")
    return ".gif";

  if (
    file.name
      .toLowerCase()
      .endsWith(".jpeg")
  ) {
    return ".jpeg";
  }

  return ".jpg";
}


function size(bytes) {

  if (bytes < 1024)
    return bytes + " B";

  if (bytes < 1024 * 1024)
    return (
      bytes / 1024
    ).toFixed(2) + " KB";

  return (
    bytes /
    (1024 * 1024)
  ).toFixed(2) + " MB";
}


function error(message) {

  errorElement.textContent =
    message;

  errorElement.classList.remove(
    "hidden"
  );

}


function clearError() {

  errorElement.classList.add(
    "hidden"
  );

  errorElement.textContent = "";

}


async function processFile(file) {

  clearError();

  if (!file)
    return;


  if (!allowed.includes(file.type)) {

    error(
      "Ảnh không đúng định dạng. Chỉ hỗ trợ PNG, JPG, JPEG, WEBP và GIF."
    );

    return;
  }


  result.classList.remove(
    "hidden"
  );


  urlArea.classList.add(
    "hidden"
  );


  nameElement.textContent =
    file.name;

  sizeElement.textContent =
    size(file.size);

  formatElement.textContent =
    file.type
      .replace("image/", "")
      .toUpperCase();


  statusElement.textContent =
    "Đang chuẩn bị...";


  preview.src =
    URL.createObjectURL(file);


  bar.style.width = "0%";

  percent.textContent =
    "0%";


  try {

    const pathname =
      randomName() +
      extension(file);


    statusElement.textContent =
      "Đang tải ảnh...";


    const blob =
      await upload(
        pathname,
        file,
        {
          access: "public",

          handleUploadUrl:
            "/api/upload",

          multipart: true,

          contentType:
            file.type,

          clientPayload:
            JSON.stringify({
              originalName:
                file.name,

              fileSize:
                file.size,

              fileType:
                file.type
            }),

          onUploadProgress:
            ({ percentage }) => {

              const p =
                Math.round(
                  percentage || 0
                );

              bar.style.width =
                p + "%";

              percent.textContent =
                p + "%";

            }
        }
      );


    if (!blob?.url) {

      throw new Error(
        "Không nhận được URL từ Vercel Blob."
      );

    }


    const finalUrl =
      `${window.location.origin}/${pathname}`;


    urlInput.value =
      finalUrl;


    bar.style.width =
      "100%";

    percent.textContent =
      "100%";


    statusElement.textContent =
      "UPLOAD THÀNH CÔNG ✓";


    urlArea.classList.remove(
      "hidden"
    );


  } catch (e) {

    console.error(e);

    statusElement.textContent =
      "UPLOAD THẤT BẠI";

    bar.style.width =
      "0%";

    percent.textContent =
      "0%";


    error(
      e?.message ||
      "Không thể upload ảnh. Hãy kiểm tra Blob Store của Vercel."
    );

  }

}


fileInput.addEventListener(
  "change",
  () => {

    processFile(
      fileInput.files?.[0]
    );

  }
);


dropzone.addEventListener(
  "dragover",
  e => {

    e.preventDefault();

    dropzone.classList.add(
      "active"
    );

  }
);


dropzone.addEventListener(
  "dragleave",
  () => {

    dropzone.classList.remove(
      "active"
    );

  }
);


dropzone.addEventListener(
  "drop",
  e => {

    e.preventDefault();

    dropzone.classList.remove(
      "active"
    );

    processFile(
      e.dataTransfer.files?.[0]
    );

  }
);


copyButton.addEventListener(
  "click",
  async () => {

    try {

      await navigator.clipboard.writeText(
        urlInput.value
      );

      copyButton.textContent =
        "ĐÃ COPY ✓";

      setTimeout(() => {

        copyButton.textContent =
          "COPY";

      }, 1500);

    } catch {

      urlInput.select();

      document.execCommand(
        "copy"
      );

    }

  }
);


againButton.addEventListener(
  "click",
  () => {

    fileInput.value = "";

    result.classList.add(
      "hidden"
    );

    urlArea.classList.add(
      "hidden"
    );

    clearError();

    fileInput.click();

  }
);
