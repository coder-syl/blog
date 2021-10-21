<template>
  <div class="about">
    <div class="about-info">
      <div class="intro">
        <img
          src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/44c0e1b456a706ac52f812fd949dbd03~300x300.image"
          alt="前端picker的个人资料头像"
          class="lazy avatar"
          data-src="https://sf1-ttcdn-tos.pstatp.com/img/user-avatar/44c0e1b456a706ac52f812fd949dbd03~300x300.image"
        />
        <div>
          <div class="intro-name">前端picker</div>
          <div class="intro-desc">
            <p>踏踏实实编码，认认真真写文。</p>
            <p>一个刚刚开始喜欢CSS的前端程序员！</p>
          </div>
        </div>
      </div>
      <social></social>
     
      <div>
        <h3>技术栈</h3>
        <table>
          <tbody>
            <tr valign="top">
              <td width="20%" align="center">
                <span>𝗛𝗧𝗠𝗟𝟱</span><br /><br />
                <img src="../assets/image/techStack/html-5.svg" />
              </td>
              <td width="20%" align="center">
                <span>𝗖𝗦𝗦𝟯</span><br /><br />
                <img src="../assets/image/techStack/css-3.svg" />
              </td>
              <td width="20%" align="center">
                <span>𝗝𝗮𝘃𝗮𝗦𝗰𝗿𝗶𝗽𝘁</span><br /><br />
                <img src="../assets/image/techStack/javascript.svg" />
              </td>
              <td width="20%" align="center">
                <span>𝗩𝘂𝗲</span><br /><br />
                <img src="../assets/image/techStack/vue.svg" />
              </td>
            </tr>
            <tr valign="top">
              <td width="20%" align="center">
                <span>Node.js</span><br /><br />
                <img src="../assets/image/techStack/nodejs-icon.svg" />
              </td>

              <td width="20%" align="center">
                <span>Nestjs</span><br /><br />
                <!-- <img src="../assets/image/techStack/nestjs.svg" /> -->
              </td>

              <td width="20%" align="center">
                <span>𝗪𝗲𝗯𝗽𝗮𝗰𝗸</span><br /><br />
                <img src="../assets/image/techStack/webpack.svg" />
              </td>
              <td width="20%" align="center">
                <span>𝗚𝗶𝘁</span><br /><br />
                <img src="../assets/image/techStack/git-icon.svg" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="about-siderbar">
      <gzh></gzh>
      
    </div>
  </div>
</template>
<script>
import social from "./about/social";
import gzh from "./about/gzh";
export default {
  components: {
    social,
    gzh
  },
  setup() {},
};
</script>
  <style lang='scss' scoped>
.about {
  display: flex;
  justify-content: center;
  .about-info {
    width:80vw;
    background: #fff;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    padding: 20px 30px;
    div {
      width: 100%;
    }
    .intro {
      display: flex;
      .avatar {
        flex: 0 0 auto;
        margin-right: 2.4rem;
        background-color: #f9f9f9;
        border-radius: 50%;
        width: 7.5rem;
        height: 7.5rem;
      }
      .intro-name {
        flex: 1 1 auto;
        margin: 0;
        padding: 0;
        font-size: 2.167rem;
        font-weight: 600;
        line-height: 1.2;
        color: #000;
      }
      .git-stats {
        width: 495px;
        height: 195px;
      }
    }
  }
  .about-siderbar {
    margin-left: 20px;
    .social-info {
      width: 240px;
      background: #fff;
      padding-bottom: 20px;
      .social-list {
        .social-detail {
          text-align: center;
          margin: 5px;
          padding: 5px;
          display: inline-block;
          width: 40%;
          border-bottom: $borderBottom;
        }
      }
    }
  }
}
table {
  display: table;
  border-color: grey;
  border-spacing: 0;
  border-collapse: collapse;
}
table tr {
  background-color: #ffffff;
  border-top: 1px solid #d0d7de;
}
table td {
  padding: 12px 12px;
  border: 1px solid #d0d7de;
}
table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

table img {
  height: 64px;
}
</style>