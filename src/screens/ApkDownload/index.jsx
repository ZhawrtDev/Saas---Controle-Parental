import React, { useEffect, useState } from "react";

function ApkDownload() {
  const [status, setStatus] = useState("");
  const [paramId, setParamId] = useState("");

  useEffect(() => {
    const idFromUrl =
      new URLSearchParams(window.location.search).get("id") || "";
    setParamId(idFromUrl);
    downloadApk(idFromUrl);
  }, []);

  const downloadApk = async (idValue) => {
    try {
      setStatus("Gerando APK assinado...");
      const response = await fetch(`http://localhost:3000/resig?id=${idValue}`);
      if (!response.ok) throw new Error("Falha ao gerar APK");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "default-mod.apk";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setStatus("APK baixado com sucesso!");
    } catch (e) {
      console.error(e);
      setStatus(`Erro: ${e.message}`);
    }
  };

  // FAZER O DESIGNER DO DOWNLOAD NO FINAL

  return (
    <div className="render-Apk">
      <div className="box-download">
        </div>      
    </div>
  );
}

export default ApkDownload;
