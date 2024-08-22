import i18n from "~/i18n.config";


export const translate = (key: string): string => {
  return i18n.global.t(key);
}
