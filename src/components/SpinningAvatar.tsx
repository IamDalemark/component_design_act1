import "./spinningAvatar.css";

type avatarProps = {
  name: string;
  nameColor: string;
  imageUrl: string;
  size: number;
  border: number;
  borderColor: string;
};

const SpinningAvatar = (props: avatarProps) => {
  const avatarStyle: React.CSSProperties = {
    width: props.size,
    height: props.size,
    border: `${props.border}px solid ${props.borderColor}`,
    fontSize: props.size / 9,
  };
  const nameStyle: React.CSSProperties = {
    color: props.nameColor,
  };
  return (
    <div className="avatar-container" style={avatarStyle}>
      <span className="avatar-name" style={nameStyle}>
        {props.name.toUpperCase().trim()}'s Avatar
      </span>
      <img src={props.imageUrl} />
    </div>
  );
};

export default SpinningAvatar;
