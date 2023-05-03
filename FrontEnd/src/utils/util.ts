//sec 2 time
export function sec2time(sec: any) {
  sec = Number(sec);
  let m = Math.floor(sec / 60);
  let s = sec % 60;

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

//https://stackoverflow.com/questions/18867697/how-to-upload-canvas-image-through-formdata-multipart-with-jquery-ajax
export function dataURItoBlob(dataURI: any) {
  // convert base64/URLEncoded data component to raw binary data held in a string
  var byteString;
  if (dataURI.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(dataURI.split(",")[1]);
  else byteString = unescape(dataURI.split(",")[1]);

  // separate out the mime component
  var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

  // write the bytes of the string to a typed array
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}
