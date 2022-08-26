import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import qs from "qs";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";

export default function SearcgPage({ events }) {
  const router = useRouter();
 
  return (
    <Layout title="Search results">
      <Link href="/events">Go Back</Link>

      <h1>Search Results for: {router.query.term}</h1>
      {events.length === 0 && <h3>No events found</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({query: { term }}) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`);

  const json = await res.json();
  const events = json.data;

  return {
    props: {
      events,
    },
  };
}
