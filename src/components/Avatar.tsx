import "./Avatar.css";

type avatarProps = {
  name: string;
  imageUrl: string;
  size: number;
  border: number;
};

const Avatar = (props: avatarProps) => {
  const avatarStyle: React.CSSProperties = {
    width: props.size,
    height: props.size,
    border: `${props.border}px solid`,
    fontSize: props.size / 8,
  };
  return (
    <div className="avatar-container" style={avatarStyle}>
      <span className="avatar-name">
        {props.name.toUpperCase().trim()}'s Avatar
      </span>
      <img src={props.imageUrl} />
    </div>
  );
};

export default Avatar;
