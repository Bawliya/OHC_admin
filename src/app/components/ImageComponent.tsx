import React, { useEffect, useState } from "react";
// import blankDarkImage from "../../../dist/media/svg/files/blank-image-dark.svg";
// import blankLightImage from "../../../dist/media/svg/files/blank-image.svg";
import { themeMenuModeLSKey } from "../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

interface ProductThumbnailProps {
  src?: string;
  onChange?: (avatar: File) => void;
  setFile: any;
  imageName?: any;
}

const ProductThumbnail: React.FC<ProductThumbnailProps> = ({
  src,
  onChange,
  setFile,
  imageName,
}) => {
  const [image, setImage] = useState<string | undefined>(src);

  useEffect(() => {
    setImage(src);
  }, [src]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onChange) {
      onChange(file);
    }
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setImage(e.target.result.toString());
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setImage(undefined);
    if (onChange) {
      onChange(new File([""], ""));
    }
  };

  const handleRemove = () => {
    setImage(undefined);
    if (onChange) {
      onChange(new File([""], ""));
    }
  };

  return (
    <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-200px mb-7 me-lg-10">
      <div className="card card-flush py-4">
        <div className="card-header">
          <div className="card-title">
            <h2>{imageName || "Image"}</h2>
          </div>
        </div>
        <div className="card-body text-center pt-0">
          <div
            className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
            data-kt-image-input="true"
          >
            <div className="image-input-wrapper w-150px h-150px">
              {/* <img
                className="image-input-placeholder object-fit-cover"
                src={
                  image ||
                  (localStorage.getItem(themeMenuModeLSKey) === "dark"
                    ? blankDarkImage
                    : blankLightImage)
                }
                alt="Placeholder"
                width="100%"
                height={"100%"}
              /> */}
            </div>
            <label
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="change"
            >
              <i className="ki-duotone ki-pencil fs-7">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
              <input
                type="file"
                name="avatar"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />
              <input type="hidden" name="avatar_remove" />
            </label>
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="cancel"
              onClick={handleCancel}
              title="Cancel avatar"
            >
              <i className="ki-duotone ki-cross fs-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </span>
            <span
              className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="remove"
              onClick={handleRemove}
              title="Remove avatar"
            >
              <i className="ki-duotone ki-cross fs-2">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>
            </span>
          </div>
          <div className="text-muted fs-7">
            Only *.png, *.jpg and *.jpeg image
            files are accepted
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductThumbnail;
