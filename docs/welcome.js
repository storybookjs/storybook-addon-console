// eslint-disable-next-line import/no-extraneous-dependencies
import React from 'react';

export default (
  <div
    style={{
      fontFamily:
        '-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", "Arial", sans-serif',
      color: '#585858',
      padding: 30,
    }}
  >
    <a href="https://badge.fury.io/js/%40storybook%2Faddon-console">
      <img src="https://badge.fury.io/js/%40storybook%2Faddon-console.svg" alt="npm version" />
    </a>
    <a href="https://github.com/storybooks/storybook-addon-console">
      <img src="https://img.shields.io/npm/dt/@storybook/addon-console.svg" alt="addon-console" />
    </a>
    <h1>Storybook Addon Console</h1>
    <big>Redirects console output into Action Logger Panel</big>
    <h2>Why</h2>
    <p>
      There're some cases when you can't / don't want / forgot to keep browser console opened. This
      addon helps you to get all console output in your storybook. In other cases, you might find it
      difficult to extract the desired information in the information noise issued by the console or
      to determine which component in what state gives the message. With this addon, you can control
      what you see and where you see.
    </p>
    <h2>Install</h2>
    <code>npm i @storybook/addon-console --save-dev</code>
    <h2>Quick Start</h2>
    <p>Just import it in your storybook config.js:</p>
    <code>import '@storybook/addon-console';</code>
    <p>
      That's all. You'll start to receive all console messages, warnings, errors in your action
      logger panel. Everything except HMR logs.
    </p>
    <p>
      read <a href="https://github.com/storybooks/storybook-addon-console">full documentation</a>
    </p>
    <h2>Live demo</h2>
    <p>
      <a href="https://storybooks.github.io/storybook-addon-console">
        <svg width="90" height="20" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <rect fill="#6d608a" width="90" height="20" rx="3" />
            <g fillRule="nonzero">
              <path
                d="M7.725 3.728L18 3v14l-9.704-.484v.016l-.843.093-.5-12.984.772.087z"
                fill="white"
              />
              <path
                fill="#6d608a"
                d="M15.462 4.905l.135-1.73 1.275-.09v1.82l-.641-.552zM13.292 8.468l2.055-.05c.05-1.94-.983-2.898-2.783-2.898-1.8 0-2.808.995-2.808 2.488 0 2.6 3.446 2.65 3.446 4.068 0 .398-.191.634-.612.634-.549 0-.766-.348-.74-1.318H9.693c-.166 2.4 1.276 2.948 2.922 2.948 1.596 0 2.847-.722 2.847-2.289 0-2.787-3.498-2.712-3.498-4.093 0-.56.409-.634.651-.634.256 0 .715.1.677 1.144z"
              />
            </g>
            <path
              d="M27.324 14.108a6.59 6.59 0 0 1-1.848-.258c-.592-.172-1.084-.41-1.476-.714l.6-1.332a4.698 4.698 0 0 0 2.748.852c.528 0 .934-.086 1.218-.258.284-.172.426-.41.426-.714 0-.272-.13-.484-.39-.636-.26-.152-.722-.3-1.386-.444-.744-.152-1.338-.336-1.782-.552-.444-.216-.768-.482-.972-.798-.204-.316-.306-.706-.306-1.17 0-.512.142-.968.426-1.368.284-.4.682-.714 1.194-.942.512-.228 1.104-.342 1.776-.342.6 0 1.178.088 1.734.264.556.176.998.412 1.326.708l-.6 1.332c-.776-.568-1.592-.852-2.448-.852-.488 0-.872.094-1.152.282a.885.885 0 0 0-.42.774c0 .192.054.35.162.474.108.124.288.234.54.33.252.096.61.196 1.074.3 1.088.24 1.87.548 2.346.924s.714.896.714 1.56c0 .8-.308 1.43-.924 1.89-.616.46-1.476.69-2.58.69zm7.848-1.344c.184 0 .376-.012.576-.036l-.096 1.32a5.088 5.088 0 0 1-.696.048c-.896 0-1.55-.196-1.962-.588-.412-.392-.618-.988-.618-1.788V9.464H31.26V8.108h1.116V6.38h1.812v1.728h1.476v1.356h-1.476v2.244c0 .704.328 1.056.984 1.056zm4.212 1.332c-.624 0-1.172-.126-1.644-.378a2.65 2.65 0 0 1-1.092-1.068c-.256-.46-.384-1.002-.384-1.626 0-.624.128-1.166.384-1.626.256-.46.62-.814 1.092-1.062.472-.248 1.02-.372 1.644-.372.624 0 1.172.124 1.644.372s.836.602 1.092 1.062c.256.46.384 1.002.384 1.626 0 .624-.128 1.166-.384 1.626a2.65 2.65 0 0 1-1.092 1.068c-.472.252-1.02.378-1.644.378zm0-1.38c.88 0 1.32-.564 1.32-1.692 0-.568-.114-.992-.342-1.272-.228-.28-.554-.42-.978-.42-.88 0-1.32.564-1.32 1.692 0 1.128.44 1.692 1.32 1.692zm8.436-3.264l-1.02.108c-.504.048-.86.19-1.068.426-.208.236-.312.55-.312.942V14h-1.812V8.108h1.74v.996c.296-.68.908-1.052 1.836-1.116l.528-.036.108 1.5zm5.04-1.332h1.776l-3.552 8.04h-1.836l1.128-2.484-2.424-5.556h1.884l1.488 3.744L52.86 8.12zm5.976-.156c.512 0 .964.124 1.356.372.392.248.698.602.918 1.062.22.46.33.994.33 1.602 0 .608-.11 1.146-.33 1.614-.22.468-.528.832-.924 1.092-.396.26-.846.39-1.35.39a2.34 2.34 0 0 1-1.104-.258 1.836 1.836 0 0 1-.756-.714V14h-1.788V5.54H57V8.9a1.79 1.79 0 0 1 .75-.69 2.37 2.37 0 0 1 1.086-.246zm-.528 4.752c.424 0 .752-.15.984-.45.232-.3.348-.722.348-1.266 0-.536-.116-.946-.348-1.23-.232-.284-.56-.426-.984-.426-.424 0-.752.146-.984.438-.232.292-.348.706-.348 1.242 0 .544.116.962.348 1.254.232.292.56.438.984.438zm7.068 1.38c-.624 0-1.172-.126-1.644-.378a2.65 2.65 0 0 1-1.092-1.068c-.256-.46-.384-1.002-.384-1.626 0-.624.128-1.166.384-1.626.256-.46.62-.814 1.092-1.062.472-.248 1.02-.372 1.644-.372.624 0 1.172.124 1.644.372s.836.602 1.092 1.062c.256.46.384 1.002.384 1.626 0 .624-.128 1.166-.384 1.626a2.65 2.65 0 0 1-1.092 1.068c-.472.252-1.02.378-1.644.378zm0-1.38c.88 0 1.32-.564 1.32-1.692 0-.568-.114-.992-.342-1.272-.228-.28-.554-.42-.978-.42-.88 0-1.32.564-1.32 1.692 0 1.128.44 1.692 1.32 1.692zm7.056 1.38c-.624 0-1.172-.126-1.644-.378a2.65 2.65 0 0 1-1.092-1.068c-.256-.46-.384-1.002-.384-1.626 0-.624.128-1.166.384-1.626.256-.46.62-.814 1.092-1.062.472-.248 1.02-.372 1.644-.372.624 0 1.172.124 1.644.372s.836.602 1.092 1.062c.256.46.384 1.002.384 1.626 0 .624-.128 1.166-.384 1.626a2.65 2.65 0 0 1-1.092 1.068c-.472.252-1.02.378-1.644.378zm0-1.38c.88 0 1.32-.564 1.32-1.692 0-.568-.114-.992-.342-1.272-.228-.28-.554-.42-.978-.42-.88 0-1.32.564-1.32 1.692 0 1.128.44 1.692 1.32 1.692zM82.944 14h-2.22l-2.256-2.628V14h-1.812V5.54h1.812v5.088L80.64 8.12h2.16l-2.472 2.808L82.944 14z"
              fill="#FFF"
            />
          </g>
        </svg>
      </a>
    </p>
    <p>
      Select stories and press button. See the output in <code>ACTION LOGGER</code> panel. It's same
      as you can see in the devtools console.
    </p>
    <p>
      <b>Note:</b> You can find the source code of selected story in the <code>STORY</code> panel.
    </p>
  </div>
);
