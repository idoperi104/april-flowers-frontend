export const uploadService = {
  uploadImg,
}

async function uploadImg(file) {
  const UPLOAD_PRESET = "profile"
  const CLOUD_NAME = "devp6bou9"

  const formData = new FormData()
  formData.append("upload_preset", UPLOAD_PRESET)
  formData.append("file", file)

  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  try {
    const formData = new FormData()
    formData.append("upload_preset", UPLOAD_PRESET)
    formData.append("file", file)

    const res = await fetch(UPLOAD_URL, {
      method: "POST",
      body: formData,
    })

    const { url } = await res.json()
    return url
  } catch (err) {
    console.error("Failed to upload", err)
    throw err
  }
}

// import dragImg from "../../assets/imgs/drag.png"

// async function handleFile({ target }) {
//    const imgUrl = await uploadService.uploadImg(target.files[0])
//    setProduct({ ...product, imgUrl })
// }

// <label htmlFor="imgUrl">Image Url:</label>
// <div className="img-uploader">
//    <img src={imgUrl || dragImg} alt="" />
//    <input
//        className="input-img"
//        onChange={handleFile}
//        ref={fileInputRef}
//        accept="image/*"
//        type="file"
//    />
// </div>
// <button type="button" onClick={() => fileInputRef.current.click()}>
//    Upload an image
// </button>

// .img-uploader {
//    position: relative;
//    width: rem(300px);
//    height: rem(200px);

//    img {
//       width: 100%;
//       height: 100%;
//       object-fit: cover;
//    }

//    .input-img {
//       width: 100%;
//       height: 100%;
//       opacity: 0;
//       position: absolute;
//       left: 0;
//    }
// }
