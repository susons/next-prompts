"use client";

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditPrompt = () => {
  const searchparams = useSearchParams();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const promptId = searchparams.get("id");
      if (!promptId) return;
      const resp = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (resp.ok) {
        router.push("/");
      }
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    const promptId = searchparams.get("id");
    if (promptId) {
      (async () => {
        const resp = await fetch(`/api/prompt/${promptId}`);
        const data = await resp.json();
        setPost((prev) => ({
          ...prev,
          prompt: data.prompt,
          tag: data.tag,
        }));
      })();
    }
  }, [searchparams]);

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};
export default EditPrompt;
