import React, { Component } from "react";

import { Icon, Input, Modal, Select, SubTitle, Text, Title } from '../ui'
import { getResponse } from '../utils';
import styles from '../styles';


const HomeHeader = ({ toggleCreateIdeaForm }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        alignSelf: "stretch",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(42,56,66,0.20)"
      }}
    >
      <Title text="My Ideas" />
      <Icon
        src="images/addanidea.png"
        onClick={() => {
          toggleCreateIdeaForm(true);
        }}
      />
    </div>
  );
};

const HomePlaceholder = () => {
  return (
    <div style={styles.screen}>
      <Icon src="images/bulb.png" />
      <SubTitle text="Got Ideas?" />
    </div>
  );
};

class IdeaForm extends Component {
  state = {
    content: this.props.content || "",
    impact: this.props.impact || 10,
    ease: this.props.ease || 10,
    confidence: this.props.confidence || 10
  };

  onConfirm = () => {
    if (this.props.id) {
      this.updateIdea();
    } else {
      this.createIdea();
    }
  };

  createIdea = () => {
    const { content, impact, ease, confidence } = this.state;
    const { createIdea, toggleCreateIdeaForm } = this.props;
    createIdea(
      JSON.stringify({
        content,
        impact,
        ease,
        confidence
      })
    );
    this.setState({
      content: "",
      impact: 10,
      ease: 10,
      confidence: 10
    });
    toggleCreateIdeaForm(false);
  };

  updateIdea = () => {
    const { content, impact, ease, confidence } = this.state;
    const { updateIdea, toggleCreateIdeaForm } = this.props;
    updateIdea(
      JSON.stringify({
        content,
        impact,
        ease,
        confidence
      })
    );
    this.setState({
      content: "",
      impact: 10,
      ease: 10,
      confidence: 10
    });
    toggleCreateIdeaForm(false);
  };

  render() {
    const { content, impact, ease, confidence } = this.state;
    const { toggleCreateIdeaForm, unSelectIdea } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", flex: 6, justifyContent: "center" }}>
          <Input
            defaultValue={content}
            onChange={event => {
              this.setState({ content: event.target.value });
            }}
          />
        </div>
        <div style={styles.column}>
          <Select
            value={impact}
            onChange={event => {
              this.setState({ impact: Number(event.target.value) });
            }}
          />
        </div>
        <div style={styles.column}>
          <Select
            value={ease}
            onChange={event => {
              this.setState({ ease: Number(event.target.value) });
            }}
          />
        </div>
        <div style={styles.column}>
          <Select
            value={confidence}
            onChange={event => {
              this.setState({ confidence: Number(event.target.value) });
            }}
          />
        </div>
        <div style={styles.column}>
          {((impact + ease + confidence) / 3).toFixed(2)}
        </div>
        <div style={styles.column}>
          <Icon src="images/confirm.png" onClick={this.onConfirm} />
        </div>
        <div style={styles.column}>
          <Icon
            src="images/cancel.png"
            onClick={() => {
              toggleCreateIdeaForm(false);
              unSelectIdea();
            }}
          />
        </div>
      </div>
    );
  }
}


class Idea extends Component {
  state = {
    showOptions: false
  }

  render() {
    const { id, content, impact, ease, confidence, selectIdea, toggleConfirmationModal} = this.props;
    const {showOptions} = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          minHeight: 40
        }}
      >
        <div style={{ display: "flex", flex: 6 }}>
          <Text text={content} />
        </div>
        <div style={styles.column}>
          <Text text={impact} />
        </div>
        <div style={styles.column}>
          <Text text={ease} />
        </div>
        <div style={styles.column}>
          <Text text={confidence} />
        </div>
        <div style={styles.column}>
          <Text text={((impact + ease + confidence) / 3).toFixed(2)} />
        </div>
        {showOptions ?
        <div 
          onMouseLeave={() => {
            this.setState({showOptions: false})
          }}
          style={{
            display: "flex",
            justifyContent: "space-around",
            flex: 2
          }}
          
        >
          <Icon
            src="images/pen.png"
            onClick={() => {
              selectIdea(id)
            }}
          />
          <Icon
            src="images/bin.png"
            onClick={() => {
              selectIdea(id)
              toggleConfirmationModal(true);
            }}
          />
        </div>
        : 
          <div 
            onMouseEnter={() => {
              this.setState({showOptions: true})
            }}
            style={{
              display: "flex",
              flex: 2,
              alignSelf: "stretch",
            }}          
          />}
      </div>
    );
  }
}

class HomeContent extends Component {
  state = {
    showCreateIdeaForm: false,
    showConfirmationModal: false,
    selectedIdeaId: "",
    list: []
  };

  componentWillMount() {
    this.fetchIdeas();
  }

  fetchIdeas = async () => {
    const list = await getResponse({
      method: "GET",
      path: "ideas"
    });
    if (Array.isArray(list)) {
      this.setState({ list });
    }
  };

  createIdea = async body => {
    const res = await getResponse({
      method: "POST",
      path: "ideas",
      body
    });
    if (!res.error) {
      this.setState({
        list: [res, ...this.state.list]
      });
    }
  };

  updateIdea = async body => {
    const { selectedIdeaId } = this.state;
    const res = await getResponse({
      method: "PUT",
      path: `ideas/${selectedIdeaId}`,
      body
    });
    if (!res.error) {
      this.setState({
        list: [res, ...this.state.list.filter(({ id }) => id !== res.id)]
      });
    }
    this.unSelectIdea();
  };

  onModalCancel = () => {
    this.toggleConfirmationModal(false);
    this.unSelectIdea();
  };

  onModalConfirm = async () => {
    const { selectedIdeaId } = this.state;
    getResponse({
      method: "DELETE",
      path: `ideas/${selectedIdeaId}`
    });
    this.setState({
      showConfirmationModal: false,
      list: this.state.list.filter(({ id }) => id !== selectedIdeaId)
    });
    this.unSelectIdea();
  };

  toggleConfirmationModal = bool => {
    this.setState({ showConfirmationModal: bool });
  };

  selectIdea = (selectedIdeaId) => {
    this.setState({
      selectedIdeaId
    });
  };


  unSelectIdea = () => {
    this.setState({
      selectedIdeaId: ""
    });
  };

  renderIdea = ({ id, content, impact, ease, confidence }) => {
    const { selectedIdeaId } = this.state;
    const { toggleCreateIdeaForm } = this.props;
    if (id === selectedIdeaId) {
      return (
        <IdeaForm
          key={id}
          id={id}
          content={content}
          impact={impact}
          ease={ease}
          confidence={confidence}
          updateIdea={this.updateIdea}
          toggleCreateIdeaForm={toggleCreateIdeaForm}
          unSelectIdea={this.unSelectIdea}
        />
      );
    } 
    return <Idea 
      key={id}
      id={id}
      content={content}
      impact={impact}
      ease={ease}
      confidence={confidence}
      updateIdea={this.updateIdea}
      toggleCreateIdeaForm={toggleCreateIdeaForm}
      selectIdea={this.selectIdea}
      toggleConfirmationModal={this.toggleConfirmationModal}
    />
  };

  render() {
    const { list, showConfirmationModal } = this.state;
    const { showCreateIdeaForm, toggleCreateIdeaForm } = this.props;
    const isEmpty = list.length === 0;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1
        }}
      >
        {isEmpty && !showCreateIdeaForm ? (
          <HomePlaceholder />
        ) : (
          <div
            style={{
              display: "flex",
              marginTop: 10
            }}
          >
            <div
              style={{ display: "flex", flex: 6, justifyContent: "center" }}
            />
            <div style={styles.column}> Impact </div>
            <div style={styles.column}> Ease </div>
            <div style={styles.column}> Confidence </div>
            <div style={styles.column}> Avg. </div>
            <div
              style={{ display: "flex", flex: 2, justifyContent: "center" }}
            />
          </div>
        )}
        {showCreateIdeaForm ? (
          <IdeaForm
            toggleCreateIdeaForm={toggleCreateIdeaForm}
            createIdea={this.createIdea}
            unSelectIdea={this.unSelectIdea}
          />
        ) : null}
        {!isEmpty ? list.map(idea => this.renderIdea(idea)) : null}
        {showConfirmationModal ? (
          <Modal
            onCancel={this.onModalCancel}
            onConfirm={this.onModalConfirm}
          />
        ) : null}
      </div>
    );
  }
}

class Home extends Component {
  state = {
    showCreateIdeaForm: false
  };

  toggleCreateIdeaForm = bool => {
    this.setState({ showCreateIdeaForm: bool });
  };

  render() {
    const { showCreateIdeaForm } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
          margin: 50,
          flex: 1
        }}
      >
        <HomeHeader toggleCreateIdeaForm={this.toggleCreateIdeaForm} />
        <HomeContent
          toggleCreateIdeaForm={this.toggleCreateIdeaForm}
          showCreateIdeaForm={showCreateIdeaForm}
        />
      </div>
    );
  }
}

export default Home;