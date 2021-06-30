import Background from '../assets/images/backimages/preview.jpg';

//定义背景样式

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
// makesure here is String确保这里是一个字符串，以下是es6写法
  backgroundImage: `url(${Background})` 
};

function Userlayout(props) {
  return (
    <div style={sectionStyle}> {props.children}</div>
  );
}

export default Userlayout;
