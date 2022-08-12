import React from 'react';

export const BellIcon = ({ isActive = false }) => {
  return (
    <svg
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99974 5.125C4.75967 5.125 2.13307 7.7516 2.13307 10.9917V15.7917H1.06641V16.8583H14.9331V15.7917H13.8664V10.9917C13.8664 7.7516 11.2398 5.125 7.99974 5.125Z"
        fill="#77757F"
      />
      <path
        d="M5.33307 18.4583V17.925H10.6664V18.4583C10.6664 19.9311 9.4725 21.125 7.99974 21.125C6.52698 21.125 5.33307 19.9311 5.33307 18.4583Z"
        fill="#77757F"
      />
      <rect
        x="10"
        y="0.875"
        width="8"
        height="8"
        rx="4"
        fill={isActive ? "#F42829" : "#e8e8ea"}
        stroke="white"
      />
    </svg>
  );
};

export const ChatIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="17"
        height="17"
        rx="8.5"
        fill="white"
        stroke="white"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5V18H10.5C6.35786 18 3 14.6421 3 10.5ZM7 11H8V10H7V11ZM14 11H13V10H14V11ZM10 11H11V10H10V11Z"
        fill="#1BD2A4"
        stroke="white"
      />
    </svg>
  );
};

export const SubmitPaymentIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="17"
        height="17"
        rx="8.5"
        fill="white"
        stroke="white"
        strokeWidth="3"
      />
      <path d="M13 10.9954V13H11V10.9954H13Z" fill="#FF8B34" />
      <path d="M13 7.99738V9.99542H11V7.99738H13Z" fill="#FF8B34" />
      <path d="M10 7.99738H8V9.99542H10V7.99738Z" fill="#FF8B34" />
      <path d="M10 10.9954H8V13H10V10.9954Z" fill="#FF8B34" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4.5C4 3.67157 4.67157 3 5.5 3H13.7071L17 6.29289V16.5C17 17.3284 16.3284 18 15.5 18H5.5C4.67157 18 4 17.3284 4 16.5V4.5ZM14 6.99738H7V14H14V6.99738Z"
        fill="#FF8B34"
      />
    </svg>
  );
};

export const VerifyPaymentIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="17"
        height="17"
        rx="8.5"
        fill="white"
        stroke="white"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5ZM10.0718 13.7106L14.3905 8.31232L13.6096 7.68762L9.92825 12.2893L7.32012 10.1159L6.67993 10.8841L10.0718 13.7106Z"
        fill="#FF8B34"
        stroke="white"
      />
    </svg>
  );
};

export const SendDirectOfferIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="17"
        height="17"
        rx="8.5"
        fill="white"
        stroke="white"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4.5C4 3.67157 4.67157 3 5.5 3H13.7071L17 6.29289V16.5C17 17.3284 16.3284 18 15.5 18H5.5C4.67157 18 4 17.3284 4 16.5V4.5ZM7 7H10V8H7V7ZM14 10H7V11H14V10ZM14 13H11V14H14V13Z"
        fill="#55ADFF"
      />
    </svg>
  );
};

export const RejectOfferIcon = () => {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2"
        y="2"
        width="17"
        height="17"
        rx="8.5"
        fill="white"
        stroke="white"
        strokeWidth="3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5ZM13.1465 13.8536L10.5 11.2071L7.85359 13.8536L7.14648 13.1465L9.79293 10.5L7.14648 7.85359L7.85359 7.14648L10.5 9.79293L13.1465 7.14648L13.8536 7.85359L11.2071 10.5L13.8536 13.1465L13.1465 13.8536Z"
        fill="#55ADFF"
        stroke="white"
      />
    </svg>
  );
};

export const NoClickIcon = () => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="1"
        width="8"
        height="8"
        rx="4"
        fill="#1D92FF"
        stroke="white"
      />
    </svg>
  );
};
