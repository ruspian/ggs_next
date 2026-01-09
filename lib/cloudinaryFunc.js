//   Fungsi Upload Signed ke Cloudinary
//   @param {File} file - File object dari input form
//   @param {string} folder - Nama folder di Cloudinary
//   @param {string} resourceType - 'image', 'raw' (dokumen), atau 'auto'

// fungsi upload ke cloudinary dengan signed upload
export const uploadToCloudinarySigned = async (
  file,
  folder = "ggs",
  resourceType = "image"
) => {
  // VALIDASI UKURAN GAMBAR - 1MB
  let LIMIT_MB = 1;

  // jika ukuran gambar lebih besar dari limit lempar error
  if (file.size > LIMIT_MB * 1024 * 1024) {
    throw new Error(`Ukuran file terlalu besar! Maksimal ${LIMIT_MB}MB.`);
  }

  try {
    // MINTA TANDA TANGAN KE SERVER
    const signRes = await fetch("/api/cloudinary/sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ folder }),
    });

    if (!signRes.ok) throw new Error("Gagal mendapatkan izin upload.");

    const signData = await signRes.json();

    // UPLOAD KE CLOUDINARY DENGAN TANDA TANGAN
    const formData = new FormData(); // formdata untuk upload
    formData.append("file", file); // file dari input
    formData.append("api_key", signData.apiKey); // api key cloudinary
    formData.append("timestamp", signData.timestamp); // timestamp dari server
    formData.append("signature", signData.signature); // tandatangan dari server
    formData.append("folder", folder); // folder tujuan di cloudinary

    // URL API Cloudinary => resource_type: image
    const uploadUrl = `https://api.cloudinary.com/v1_1/${signData.cloudName}/${resourceType}/upload`;

    //     Lakukan upload
    const uploadRes = await fetch(uploadUrl, {
      method: "POST",
      body: formData,
    });

    //     jika gagal lempar error
    if (!uploadRes.ok) {
      const err = await uploadRes.json();
      throw new Error(err.error?.message || "Gagal upload ke cloud.");
    }

    //     ambil hasil upload
    const result = await uploadRes.json();

    // KEMBALIKAN URL FILE
    return result.secure_url;
  } catch (error) {
    throw error;
  }
};

//  Fungsi Hapus File dari Cloudinary
export const deleteFromCloudinary = async (url, resourceType = "image") => {
  if (!url) return; // jika tidak ada url, tidak perlu dihapus

  // Ekstrak Public ID dari URL
  // Public ID: folder/filename
  try {
    const parts = url.split("/"); // pecah berdasarkan '/'
    const uploadIndex = parts.indexOf("upload"); // cari index 'upload'
    if (uploadIndex === -1) return; // jika tidak ada 'upload', keluar

    // Ambil bagian setelah 'version' (v123...)
    const pathParts = parts.slice(uploadIndex + 2);
    const fileNameWithExt = pathParts.join("/"); // gabungkan kembali menjadi path file

    // Hapus ekstensi (.jpg, .docx) untuk mendapatkan public_id murni
    const publicId = fileNameWithExt.substring(
      0,
      fileNameWithExt.lastIndexOf(".")
    );

    // Panggil API Delete
    const res = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId, resourceType }),
    });

    if (!res.ok) throw new Error("Gagal menghapus file lama");

    return true;
  } catch (error) {
    console.error("Gagal hapus file:", error);
    return false; // Kembalikan false jika gagal agar ui tidak error
  }
};
