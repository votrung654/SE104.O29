import React from "react";
import { useTranslation } from "react-i18next";

const TextTranslation = ({ textName, kClass }) => {
  const { t } = useTranslation();
  return t(textName).toString();
};

export default TextTranslation;
