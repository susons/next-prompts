"use client";

import MyProfile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user.id) {
      (async () => {
        const resp = await fetch(`/api/users/${session?.user.id}/posts`);

        const data = await resp.json();
        setPosts(data);
      })();
    }
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = (post) => {
    const confirmed = confirm("Are you sure you want to delete?");
    if (confirmed && post._id) {
      (async () => {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });

          setPosts((prev) => prev.filter((p) => p._id !== post._id));
        } catch (error) {}
      })();
    }
  };

  return (
    <MyProfile
      name={"my name"}
      desc={"welcome to page"}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
