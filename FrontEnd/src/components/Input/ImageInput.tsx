interface Props {
  id: string;
}
export default function ImageInput({ id }: Props) {
  const submit = () => {
    let formData = new FormData(); // formData 객체를 생성한다.
    formData.append(`badgeType`, id);
    //formData.append("file", dataURItoBlob(imgSrc)); //이미지 소스
  };
  return (
    <div className="w-full h-full bg-blue-500">
      <input id={id} type="file" multiple={false} />
    </div>
  );
}
