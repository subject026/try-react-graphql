import React from "react";
import apiClient from "../../api/axios";
import { setMember } from "../../features/member/memberSlice";
import { useAppDispatch } from "../../store/hooks";

const FindMember = () => {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const discordName = event.target.discordName.value;
    if (!discordName) return;
    apiClient({
      data: {
        query: `
          query {
            findMember(fields:{
              discordName: "${discordName}"
            }){
              _id
              discordName
              discordID
              discordAvatar
              tweets
              skills {
                tagName
              }
              projects
              archiveProjects
              registeredAt              
            }
          }
        `,
      },
    })
      .then((res) => {
        const data = res.data.data.findMember[0];
        console.log(data);
        dispatch(setMember(data));
        setIsSubmitting(false);
        event.target.reset();
      })
      .catch((err) => {
        console.log("something went wrong");
        setIsSubmitting(false);
      });
  };

  return (
    <section className="max-w-4xl p-8 m-auto">
      <h3 className="mb-4 text-xl font-bold">Find Member</h3>
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
          <button
            className="px-3 py-2 br-4 text-white rounded font-bold bg-blue-700 disabled:bg-neutral-500 disabled:text-neutral-300"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "submitting..." : "find"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FindMember;
