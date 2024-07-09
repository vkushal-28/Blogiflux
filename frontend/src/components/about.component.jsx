import React from "react";
import { Link } from "react-router-dom";
import { getFullDay } from "../common/date";

const AboutUser = ({ bio, social_links, joinedAt, className }) => {
  return (
    <div className={"md:w-[90%] md:mt-7 " + className}>
      <p className="text-xl leading-7">
        {bio.length ? bio : "Nothing to read here"}
      </p>
      <div className="flex gap-x-7 gap-y-2 max-md:justify-center  justify-start flex-wrap my-7  text-dark-grey">
        {Object.keys(social_links).map((lnk, key) => {
          const link = social_links[lnk];
          return link ? (
            <Link to={link} key={key} target="_blank">
              <i
                className={
                  "fi " +
                  (lnk !== "website" ? " fi-brands-" + lnk : "fi-rr-globe ") +
                  " text-2xl hover:text-black"
                }
              ></i>{" "}
            </Link>
          ) : (
            " "
          );
        })}
      </div>
      <p className="text-xl leading-7 text-dark-grey">
        Joined on {getFullDay(joinedAt)}
      </p>
    </div>
  );
};

export default AboutUser;
