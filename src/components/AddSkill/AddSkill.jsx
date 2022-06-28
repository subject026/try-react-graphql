import React from "react";
import apiClient from "../../api/axios";

const AddSkill = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const discordName = event.target.discordName.value;
    const tagName = event.target.tagName.value;
    if (!discordName || !tagName) return;
    apiClient({
      data: {
        query: `
          query{
            findSkill(fields:{                
              tagName: "${tagName}"
            }){
              _id
              tagName
              members {
                discordName
              }     
            }
          }
          `,
      },
    })
      .then((res) => {
        const data = res.data.data;
        console.dir(data);
      })
      .catch((err) => {
        console.log("something went wrong");
      });
  };

  return (
    <section className="max-w-4xl p-8 m-auto">
      <h3 className="mb-4 text-xl font-bold">Add Skill</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block mb-1" htmlFor="discordName">
            discord name
          </label>
          <input
            className="rounded px-3 py-2 mr-8 border-solid border-2 border-neutral-500"
            type="text"
            name="discordName"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1" htmlFor="discordName">
            new skill
          </label>
          <input
            className="rounded px-3 py-2 mr-8 border-solid border-2 border-neutral-500"
            type="text"
            name="tagName"
          />
        </div>
        <button
          className="px-3 py-2 br-4 text-white rounded font-bold bg-blue-700 disabled:bg-neutral-500 disabled:text-neutral-300"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "submitting..." : "Add Skill"}
        </button>
      </form>
    </section>
  );
};

export default AddSkill;
