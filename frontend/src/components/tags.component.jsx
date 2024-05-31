import React, { useContext } from "react";
import { EditorContext } from "../pages/editor.pages";

const Tag = ({ tag, tagIndex }) => {
  let {
    blog,
    blog: { tags },
    setBlog,
  } = useContext(EditorContext);

  console.log(tags);

  const handleTagDelete = (e) => {
    tags = tags.filter((t) => t !== tag);
    setBlog({ ...blog, tags });
  };

  const handleTagsEdit = (e) => {
    if (e.keyCode == 13 || e.keyCode == 100) {
      e.preventDefault();

      const currentTag = e.target.innerText;

      tags[tagIndex] = currentTag;
      setBlog({ ...blog, tags });

      e.target.setAttribute("contentEditable", false);
    }
  };

  const addEditable = (e) => {
    e.target.setAttribute("contentEditable", true);
    e.target.focus();
  };

  return (
    <div className="relative p-2 mt-2 mr-2 px-5 bg-white rounded-full inline-block hover:bg-opacity-60 pr-8">
      <p
        className="outline-none"
        onKeyDown={handleTagsEdit}
        // contentEditable="true"
        onClick={addEditable}
      >
        {tag}
      </p>
      <button
        className="mt-[2px] rounded-full absolute right-3 top-1/2 -translate-y-1/2"
        onClick={handleTagDelete}
      >
        <i className="fi fi-br-cross text-sm pointer-events-none"></i>
      </button>
    </div>
  );
};

export default Tag;
