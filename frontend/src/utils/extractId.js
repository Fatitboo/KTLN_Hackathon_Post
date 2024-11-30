const extractId = ({ type, str }) => {
  if (str?.startsWith("!imptHktid")) {
    const arr = str?.split("_");
    return type === "hackathonId" ? arr[1] : arr[2];
  } else return str;
};
export default extractId;
