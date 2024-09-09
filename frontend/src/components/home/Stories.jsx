import React, { useState, useEffect } from "react";
import AddStory from "./AddStory";
import unknown from "/assets/unknown.png";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../../style/Stories.css";
import Story from "./Story";

export default function Stories() {
  const [stories, setStories] = useState([]);
 useEffect(() => {
   fetchStories();
 }, []);
    const fetchStories = async () => {
      try {
        const response = await fetch("http://localhost:3005/stories", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStories(data);
        } else {
          console.error("Failed to fetch stories");
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };


  return (
    <div className="stories">
      <AddStory />
      <Swiper style={{ width: "100%" }} slidesPerView={6} spaceBetween={0}>
        {stories.map((story) => (
          <SwiperSlide>
            <div className="story" key={story.storyId}>
              <div className="user">
                {story.profilePicture ? (
                  <img
                    src={story.profilePicture}
                    alt="Profile"
                    width="40"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src={unknown}
                    alt="Profile"
                    width="40px"
                    style={{ borderRadius: "50%" }}
                  />
                )}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="h-full">
                    <img src={story.contentimg} alt="story" width="100%" className="h-full w-full object-cover"/>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]"><Story story={story} /></DialogContent>
              </Dialog>
            </div>
            <div className="username-st">
              <h5>@{story.nickname}</h5>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
