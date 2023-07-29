import instance from "./instances";

export const getHome = () => {
  return instance.get("home");
};
export const infoSong = (id: string) => {
  return instance.get(`/infosong?id=${id}`);
};
export const getSong = (id: string) => {
  return instance.get(`/song?id=${id}`);
};
export const getPlayList = (id: string) => {
  return instance.get(`/detailplaylist?id=${id}`);
};
