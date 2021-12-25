import Head from "next/head";
import Feed from "../components/Feed";
import Sidebar from "../components/Sidebar";
import { getProviders, getSession, useSession } from "next-auth/react";
import Login from "../components/Login";
import Modal from "../components/Modal";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Widgets from "../components/Widgets";

export default function Home({ trendingResults, followResults, providers }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useRecoilState(modalState);

  if (!session) return <Login providers={providers} />;

  return (
    <div className="flex-initial flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Twitter Clone App - CreatorSpaceSaurabh</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-black min-h-screen flex max-w-[1500px] mx-auto">
        <Sidebar />
        <Feed />
        <Widgets
          trendingResults={trendingResults}
          followResults={followResults}
        />
        {isOpen && <Modal />}
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    let props = {};
    const trendingResults = await fetch("https://jsonkeeper.com/b/NKEV", {
      method: "GET",
      headers: {
        // update with your user-agent
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        Accept: "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => (props["trendingResults"] = json));
    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ", {
      method: "GET",
      headers: {
        // update with your user-agent
        "User-Agent":
          "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36",
        Accept: "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => (props["followResults"] = json));
    const providers = await getProviders().then(
      (json) => (props["providers"] = json)
    );
    const session = await getSession(context).then(
      (json) => (props["session"] = json)
    );

    return {
      // props: {
      //   trendingResults,
      //   followResults,
      //   providers,
      //   session,
      // },
      props,
    };
  } catch (error) {
    console.log("\n error ==>", error);
    return error;
  }
}
