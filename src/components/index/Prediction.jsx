import Section from "../../components/Section";
import Title from "../../components/Title";
import Card from "../../components/Card";

export default () => {
  return (
    <Section class="md:pt-10 pt-25 md:ma mt-20">
      <Title
        title="Prediction"
        description="From the data we collected, .....Lorem ipsum dolor sit amet, consectetur adipiscing elit, This sentence can not be too long (max 50%)"
        right
      />
      <div class="flex h-130 mt-20">
        <Card class="flex-grow mr-20">LEFT</Card>
        <Card class="w-18">RIGHT</Card>
      </div>
      <Card class="w-100% mt-20 h-20">BOTTOM</Card>
    </Section>
  );
};
