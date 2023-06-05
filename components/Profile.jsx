import { PromptCardList } from "./Feed";
import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data = [], handleEdit, handleDelete }) => {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{name} profile</span>
      </h1>
      <div className="desc text-left">{desc}</div>
      <PromptCardList
        data={data.length ? data : []}
        handleTagClick={() => {}}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {/* <PromptCard /> */}
    </section>
  );
};

export default Profile;
