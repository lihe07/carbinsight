import Section from "@/components/Section";
import avatar from "@/assets/images/avatar.jpg";
import { Title } from "solid-start";

function ContentArea() {
  return (
    <article class="flex-1">
      <h1 class="text-4xl font-bold mt-3">文章标题</h1>

      <img
        src="https://lms.d.zhan.com/zhanlms/addon_homework/2023/02/846314863eaf7ae27fe2/kvblurred.png"
        alt="cover"
        class="w-full md:h-70 h-50 object-cover object-center rounded-xl"
        srcset=""
      />

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>

      <p class="text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eligendi eaque
        sed dignissimos maxime. Est praesentium consequuntur dolore tempore,
        accusamus ipsa, magni, eligendi laboriosam inventore totam nobis
        dignissimos odio doloribus cum.
      </p>
    </article>
  );
}

function Metadata() {
  return (
    <div class="w-70 md:sticky top-30 h-max flex md:flex-col flex-row md:items-start items-center gap-1">
      <div class="flex items-center gap-3">
        <img
          src={avatar}
          alt="avatar"
          srcset=""
          class="w-17 h-17 rounded-50% border-5 border-solid border-true-gray-8"
        />
        <div>
          <p class="text-xl m0 font-bold">He Li</p>
          <p class="mt-1 mb-0 op-50">Developer</p>
        </div>
      </div>
      <hr class="border-true-gray-8 border-3 md:my-5 my-0 md:mx-0 mx-5 md:h-0 md:w-full h-15"></hr>

      <p class="op-50 text-lg m0">
        <span class="font-bold">Published: </span>2021-08-01
      </p>

      <p class="op-50 text-lg m0">
        <span class="font-bold">Tags: </span>A,B,C
      </p>
    </div>
  );
}

export default () => {
  return (
    <div class="pt-20 color-white">
      <Title>Carbinsight - 文章</Title>

      <Section>
        <div class="flex gap-10 md:flex-row flex-col-reverse ">
          <ContentArea></ContentArea>
          <Metadata></Metadata>
        </div>
      </Section>
    </div>
  );
};
