import React from 'react';
import { LeaderboardPage } from './leaderboardPage';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { getMockStore } from '../test-utils/mocks';
import { history } from '../reduxRelated';
import Container from '@material-ui/core/Container';
import { createMount } from '@material-ui/core/test-utils';
import { createMemoryHistory } from 'history';
import axios from 'axios';

const mockStore = getMockStore(
  {
    userInfo: {
      email: 'test@test.com',
      name: 'tester',
    },
    loggedIn: true,
  },
  {
    allAlgorithmList: [{ id: 1, name: '', description: '' }],
    ownedAlgorithmList: [{ id: 1, name: '', description: '' }],
  },
  {
    ownedSnippetList: [{ id: 1, name: '', description: '' }],
    likedSnippetList: [{ id: 1, name: '', description: '' }],
    sharedSnippetList: [{ id: 1, name: '', description: '' }],
  },
  { loadedDraftName: '' },
);

describe('test leaderboard', () => {
  let mount, leaderboard;

  beforeEach(() => {
    mount = createMount();
    leaderboard = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Container maxWidth="lg">
            <LeaderboardPage history={createMemoryHistory()}/>
          </Container>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should render leaderboard', () => {
    const component = mount(leaderboard);
    axios.get = jest.fn(() => {
      return Promise.resolve({ status: 200, data: [{ id: 1, name: '', author: '', description: '' }] });
    });
    const wrapper = component.find('LeaderboardPage');
    expect(wrapper.length).toBe(1);
  });
});
