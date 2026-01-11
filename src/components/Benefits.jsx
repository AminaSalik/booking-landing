import { FaMobileAlt, FaBolt, FaCheckCircle } from "react-icons/fa";

function Benefits() {
  return (
    <div className="features">
      <div className="feature">
        <div className="container">
          <div className="shape">
            <div className="shape-content">
              <FaMobileAlt className="mobile-icon" />
              <span>Mobile Friendly</span>
            </div>
          </div>
        </div>
      </div>
      <div className="feature center">
        <div className="wrapper">
          <div className="wrapper__inner">

            <div className="item"></div>
            <div className="item"></div>
            <div className="item item-content">
              <div className="content">
                <FaBolt className="bolt-icon" />
                <span className="text-white">Fast Booking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="feature">
        <div className="container">
          <div className="shape">
            <div className="shape-content">
              <FaCheckCircle className="check-icon" />
              <span>Easy Scheduling</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Benefits;
