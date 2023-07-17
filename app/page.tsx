"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//split everything off into components
export default function Home() {
  const [showInput, setShowInput] = useState(false);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //change to an API call so that the password isn't exposed
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="flex flex-row justify-between p-4">
        <h3>Sample Scheduler</h3>
        {showInput ? (
          <form
            action=""
            onSubmit={login}>
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit">Enter</button>
            </label>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setShowInput(true)}>
            Admin View
          </button>
        )}
      </header>
      <main className="w-full flex flex-col">
        <form
          action=""
          className="flex flex-row justify-evenly">
          <div>
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              name="date"
            />
          </div>

          <fieldset className="flex flex-row gap-4">
            <div>
              <label htmlFor="all">Show All</label>
              <input
                type="radio"
                id="all"
                name="view"
                value="all"
              />
            </div>
            <div>
              <label htmlFor="open">Show Available</label>
              <input
                type="radio"
                id="open"
                name="view"
                value="open"
              />
            </div>
          </fieldset>
        </form>
        <div className="flex flex-row">
          <section className="w-1/2">chart section</section>
          <section className="w-1/2">
            <form
              action=""
              className="flex flex-col">
              <label htmlFor="name">
                {" "}
                Name:
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </label>
              <label htmlFor="email">
                Email:
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                />
              </label>
              <label htmlFor="phone">
                Phone:
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                />
              </label>
              <label htmlFor="note">
                Additional Information:
                <textarea
                  name="note"
                  id="note"
                  cols={30}
                  rows={5}></textarea>
              </label>
            </form>
          </section>
        </div>
      </main>
    </>
  );
}
