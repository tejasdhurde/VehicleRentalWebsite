import React from 'react';
import '../../assets/VehicleGallery.css';

const VehicleGallery = ({ images = [] }) => {
  return (
    <div className="vehicle-gallery row gx-4 gy-4">
      {images.length === 0 ? (
        <div className="col-12 text-center">
          <p className="text-muted fs-5">🚫 No images available for this vehicle.</p>
        </div>
      ) : (
        images.map((img, index) => (
          <div key={index} className="col-md-6 col-lg-4">
            <div className="vehicle-image-wrapper">
              <img
                src={`http://localhost:8080${img.imageUrl}`}
                alt={`Vehicle ${index + 1}`}
                className="img-fluid vehicle-gallery-img"
              />
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default VehicleGallery;
