import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation, {
  activeTabRef,
} from "../components/inpage-navigation.component";
import axios from "axios";
import Loader from "../components/loader.component";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPostCard from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationdata } from "../common/filter-pagination-data";
import LoadMoreData from "../components/load-more.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");
  const [trendingBlogs, setTrendingBlogs] = useState(null);

  let categories = [
    "programming",
    "hollywood",
    "film making",
    "social media",
    "cooking",
    "technology",
    "finances",
    "travel",
  ];

  const fetchLatestBlogs = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationdata({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });

        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setBlogs(null);

    if (pageState == category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationdata({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState },
        });
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState == "home") {
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogsByCategory({ page: 1 });
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10 ">
        {/* Latest blogs */}

        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}>
            <>
              {blogs == null ? (
                <Loader />
              ) : blogs.result.length ? (
                blogs.result.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}>
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"No blogs published"} />
              )}
              <LoadMoreData
                state={blogs}
                fetchDataFunc={
                  pageState == "home" ? fetchLatestBlogs : fetchBlogsByCategory
                }
              />
            </>

            <>
              {trendingBlogs == null ? (
                <Loader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}>
                      <MinimalBlogPostCard blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"No trending blogs published"} />
              )}
            </>
          </InPageNavigation>
        </div>

        {/* Filters and trending blogs */}

        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-5 mb-6">
            <h1 className="font-medium text-xl">Stories from all interests</h1>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category, i) => {
                return (
                  <button
                    className={`tag ${
                      pageState == category && "bg-black text-white"
                    } `}
                    key={i}
                    onClick={loadBlogByCategory}>
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h1 className="font-medium text-xl  mb-8">
              Trending <i className="fi fi-rr-arrow-trend-up"></i>
            </h1>
            {trendingBlogs == null ? (
              <Loader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}>
                    <MinimalBlogPostCard blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message={"No trending blogs published"} />
            )}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
