import React, { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import toast, { Toaster } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import Tag from "./tags.component";
import axios from "axios";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";

const PublishForm = () => {
  const characterLimit = 250;
  const tagLimit = 10;

  const navigate = useNavigate();
  const { blog_id } = useParams();

  let {
    blog,
    blog: { banner, title, tags, content, description },
    setBlog,
    setEditorState,
  } = useContext(EditorContext);

  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const handleClose = (e) => {
    setEditorState("editor");
  };

  const handleBlogTitleChange = (e) => {
    let input = e.target;
    setBlog({ ...blog, title: input.value });
  };

  const handleDescriptionChange = (e) => {
    const input = e.target;
    setBlog({ ...blog, description: input.value });
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handlekeyDown = (e) => {
    if (e.keyCode === 13 || e.keyCode === 100) {
      e.preventDefault();

      let tag = e.target.value;
      if (tags.length < tagLimit) {
        if (!tags.includes(tag) && tag.length) {
          setBlog({ ...blog, tags: [...tags, tag] });
        }
      } else {
        toast.error(`You can add max ${tagLimit} tags.`);
      }
      e.target.value = "";
    }
  };

  const onPublishBlog = (e) => {
    if (e.target.className.includes("disable")) {
      return;
    }

    if (!title.length) {
      return toast.error("Write blog title before publish");
    }
    if (!description.length || description.length > characterLimit) {
      return toast.error(
        `Write a description about your blog withing ${characterLimit} characters to publish`
      );
    }
    if (!tags.length) {
      return toast.error(
        `Enter atleast 1 tag to help us rank yout  ${characterLimit} characters to publish`
      );
    }

    let loadingToast = toast.loading("Publishing...");

    e.target.classList.add("disable");

    let blogObj = {
      title,
      banner,
      content,
      description,
      tags,
      draft: false,
    };

    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
        { ...blogObj, id: blog_id },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then(() => {
        e.target.classList.remove("disable");

        toast.dismiss(loadingToast);
        toast.success("Published 👍🏼");

        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch(({ response }) => {
        e.target.classList.remove("disable");
        toast.dismiss(loadingToast);
        return toast.error(response.data.error);
      });
  };

  return (
    <AnimationWrapper>
      <section className="w-screen min-h-screen grid items-center lg:grid-cols-2 lg:gap-4">
        <Toaster />
        <button
          className="w-12 h-12 absolute right-[5vw] z-10 top-[5%] lg:top-[10%]"
          onClick={handleClose}
        >
          <i className="fi fi-br-cross"></i>
        </button>

        <div className="max-w-[550px] center">
          <p className="text-dark-grey mb-1">Preview</p>
          <div className="w-full aspect-video rounded-lg overflow-hidden mt-4">
            <img src={banner} alt="" />
          </div>

          <h1 className="text-4xl font-medium mt-2 leading-tight line-clamp-2">
            {title}
          </h1>

          <p className="font-gelasio line-clamp-2 text-xl leading-7 mt-4">
            {description}
          </p>
        </div>
        <div className="border-gray lg:border-1 lg:pl-8">
          <p className="text-dark-grey mb-2 mt-9">Blog Title</p>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={handleBlogTitleChange}
            className="input-box pl-4"
          />
          <p className="text-dark-grey mb-2 mt-9">
            Short description about your blog
          </p>

          <textarea
            maxLength={characterLimit}
            defaultValue={description}
            id=""
            className="h-40 resize-none leading-7 input-box pl-4"
            onChange={handleDescriptionChange}
            onKeyDown={handleTitleKeyDown}
          ></textarea>
          <p className="mt-1 text-dark-grey text-sm text-right">
            {characterLimit - description.length} characters left
          </p>

          <p className="text-dark-grey mb-2 mt-9">
            Topics - (Helps is searching and ranking your blog spot)
          </p>

          <div className="relative input-box pl-2 py-2 pb-4">
            <input
              type="text"
              placeholder="Topic"
              className="sticky input-box bg-white top-0 left-0 pl-4 mb-3 focus:bg-white"
              onKeyDown={handlekeyDown}
            />
            {tags.map((tag, i) => {
              return <Tag tag={tag} tagIndex={i} key={i} />;
            })}
          </div>
          <p className="mt-1 mb-4 text-dark-grey text-right">
            {tagLimit - tags.length} Tags left
          </p>
          <button className="btn-dark px-8" onClick={onPublishBlog}>
            Publish
          </button>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default PublishForm;
