import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import { API_URL } from "@/config/index";
import Link from "next/link";

export default function HomePage({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events found</h3>}
      {events.map(evt => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      {events.length > 0 && (
        <Link href="/events" className="btn">
          <a className="btn-secondary">View all events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(API_URL + "/api/events?populate=*&_sort=date:ASC");
  const json = await res.json();
  const events = json.data;
  // ?populate=*&_sort=date:ASC&_limit=3
  // /api/events?[populate]=*
  return {
    props: {
      events: events,
    },
    revalidate: 1,
  };
}
