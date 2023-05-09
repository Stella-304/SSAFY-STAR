using System.Collections;
using System.Collections.Generic;
using System.Xml.Serialization;
using UnityEngine;
using TMPro;
using Ink.Runtime;
using UnityEngine.Monetization;

public class DialogueManager : MonoBehaviour
{
    [Header("Dialogue UI")]
    [SerializeField]
    private GameObject dialoguePanel;
    [SerializeField]
    private TextMeshProUGUI dialogueText;

    [Header("NPC info")]
    public GameObject NPC;

    private Story currentStory;
    private bool dialogueIsPlaying;
    public bool finishChat = false;

    private static DialogueManager instance;

    private void Awake()
    {
        if (instance != null)
        {
            Debug.Log("�̱����ε� �̹� ������");
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
        //��ȭ���� ��������� ������ ����
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
        if (currentStory.canContinue)
        {
            dialogueText.text = currentStory.Continue();
        }
        else
        {
            ExitDialogueMode();
        }
    }
}
