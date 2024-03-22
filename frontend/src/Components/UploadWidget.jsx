import { useEffect, useRef, useState } from 'react';

const UploadWidget = () => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const [uploadedUrl, setUploadedUrl] = useState('');

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: 'db56itdcp',
        uploadPreset: 'ehbuvb9r'
      },
      function(error, result) {
        if (!error && result && result.event === 'success') {
          const { secure_url } = result.info;
          setUploadedUrl(secure_url);
          console.log('Uploaded URL:', secure_url);
        }
      }
    );
  }, []);

  const handleUploadClick = () => {
    widgetRef.current.open();
  };

  return (
    <div>
      <button onClick={handleUploadClick}>Upload</button>
      {uploadedUrl && (
        <div>
          <video width="350" height="500" controls>
            <source src={uploadedUrl} type="video/mp4" />
          </video>
        </div>
      )}
    </div>
  );
};

export default UploadWidget;
