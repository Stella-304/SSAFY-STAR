using System.Collections;
using System.Collections.Generic;
using System.Xml.Serialization;
using UnityEngine;
using TMPro;
using Ink.Runtime;
using UnityEngine.Monetization;
using UnityEngine.EventSystems;
using UnityEngine.UI;

public class DialogueManager : MonoBehaviour
{
    [Header("Dialogue UI")]
    [SerializeField]
    private GameObject dialoguePanel;
    [SerializeField]
    private TextMeshProUGUI dialogueText;
    [SerializeField]
    private TMP_Text NPCname;

    [Header("Question UI")]
    [SerializeField]
    private GridLayoutGroup choiceButtonContainer;
    [SerializeField]
    private Button choiceButtonPrefab;

    [Header("NPC info")]
    public GameObject NPC;

    private Story currentStory;
    public bool dialogueIsPlaying { get; private set; }
    public bool finishChat = false;

    private static DialogueManager instance;

    private void Awake()
    {
        if (instance != null)
        {
            //Debug.Log("싱글턴인데 이미 존재함");
        }
        instance = this;
    }

    public static DialogueManager GetInstance()
    {
        return instance;
    }

    private void Start()
    {
        dialogueIsPlaying = false;
        dialoguePanel.SetActive(false);
    }

    private void Update()
    {
        //대화록이 재생중이지 않으면 리턴
        if (!dialogueIsPlaying)
        {
            return;
        }
        if(Input.GetKeyDown(KeyCode.Space))
        {
            ContinueStory();
        }
    }

    public void EnterDialogueMode(TextAsset inkJson)
    {
        NPCname.text = NPC.gameObject.name;

        currentStory = new Story(inkJson.text);
        dialogueIsPlaying = true;
        dialoguePanel.SetActive(true);

        ContinueStory();
    }

    private void ExitDialogueMode()
    {
        dialogueIsPlaying = false;
        dialoguePanel.SetActive(false);
        dialogueText.text = "";
        NPC.GetComponent<NPC>().FinishChat();
        NPC = null;
    }

    public void ContinueStory()
    {
        if(!currentStory)
        {
            ExitDialogueMode();
        }

        if (currentStory.canContinue)
        {
            dialogueText.text = currentStory.Continue();
            //DisplayChoices();
        }
        else if(currentStory.currentChoices.Count>0)
        {
            DisplayChoices();
        }
        else
        {
            ExitDialogueMode();
        }
    }

    private void DisplayChoices()
    {
        if (choiceButtonContainer.GetComponentsInChildren<Button>().Length > 0)
        {
            return;
        }

        choiceButtonContainer.gameObject.SetActive(true);

        for (int i = 0; i < currentStory.currentChoices.Count; i++)
        {
            Choice choice = currentStory.currentChoices[i];
            Button button = CreateChoiceButton(choice.text);

            button.onClick.AddListener(() =>  OnClickChoiceButton(choice) );
        }
    }

    private Button CreateChoiceButton(string text)
    {
        Button choiceButton = Instantiate(choiceButtonPrefab);
        choiceButton.transform.SetParent(choiceButtonContainer.transform, false);

        TMP_Text buttonText = choiceButton.GetComponentInChildren<TMP_Text>();
        buttonText.text = text;

        return choiceButton;
    }

    private void OnClickChoiceButton(Choice choice)
    {
        currentStory.ChooseChoiceIndex(choice.index);
        RefreshChoiceView();
        ContinueStory();
        choiceButtonContainer.gameObject.SetActive(false);
    }

    private void RefreshChoiceView()
    {
        if(choiceButtonContainer != null)
        {
            foreach(Button button in choiceButtonContainer.GetComponentsInChildren<Button>())
            {
                Destroy(button.gameObject);
            }
        }
    }
}
