<template>
  <NewTicket />
</template>
    
<script>
import NewTicket from "@/components/site-issue/NewTicket.vue";

export default {
  name: "NewSiteIssueTicket",
  components: { NewTicket },
  middleware: "auth",

  asyncData({ store }) {
    const clientData = store.getters["default/getClient"];

    const mainData = {
      title: `Create a Support Ticket | ${clientData?.siteName}`,
      description:
        "Need help? Create a support ticket, and we will reach out with a solution.",
      image: clientData?.sharingImage,
    };

    const headData = {
      title: mainData.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: mainData.description,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: mainData.title,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: mainData.description,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: mainData.image,
        },
      ],
    };
    return { headData };
  },
  head() {
    return this.headData;
  },
};
</script>