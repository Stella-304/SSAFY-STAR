using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

[System.Serializable]
public class LogText
{
    [TextArea]
    public string log;
}

public class Dialogue : MonoBehaviour
{
    static private string[] dialogue;
    bool firstTalk = false;

    [Header("질문 버튼")]
    [SerializeField]
    private GameObject questionPanel;
    [SerializeField]
    private Button questionButton1;
    [SerializeField]
    private Button questionButton2;

    [Header("대화록")]
    private int count = 0; // 대화가 얼마나 진행 되었는지 확인
    [SerializeField]
    TMP_Text txt_dialogue;
    static public bool isDialogue = true;
    static public int npcTalkCnt = 0;


    private void Awake()
    {
        dialogue = new String[100];

        //처음 intro 대사
        dialogue[0] = "안녕하세요 플레이어님 반가워요";
        dialogue[1] = "싸피스타의 메타버스 공간에 오신걸 환영해요";
        dialogue[2] = "end";

        //main 대사
        dialogue[3] = "[열심히 돌아다니는 중...]";
        dialogue[4] = "원하시는 질문을 선택해 주세요";
        dialogue[5] = "end";

        dialogue[6] = "";

        //질문1
        dialogue[7] = "<조작방법>이 궁금하시군요";
        dialogue[8] = "이동 :방향키와 asdw를 사용해서 이동할 수 있습니다." +
                      "\n    스페이스바로 점프, shift로 달릴 수 있어요" +
                      "\n 회전 : 화면의 가장자리로 마우스를 이동해 보세요";
        dialogue[9] = "M을 누르시면 전체 맵을 확인 할 수 있어요";
        dialogue[10] = "원하시는 기능이 있다면 언제든지 카카오채널로 문의해주세요!";
        dialogue[11] = "end";

        //질문2
        dialogue[12] = "그럼 좋은 시간 보내세요";
        dialogue[13] = "end";

        QuestionSetActive(false);
    }

    private void Start()
    {
        NextDialogue();
    }

    public void TalkNPC()
    {
        QuestionSetActive(true);
        count = 3;
        txt_dialogue.text = dialogue[count];
    }

    private void NextDialogue()
    {
        txt_dialogue.text = dialogue[count];
        count++;
    }

    public void ClickQuestionControl()
    {
        isDialogue = true;
        QuestionSetActive(false);
        count = 7;
        npcTalkCnt = 0;
        if(count<dialogue.Length)
        {
            NextDialogue();
        }
    }

    public void ClickQuestionExit()
    {
        npcTalkCnt = 1;
    }

    public void QuestionSetActive(bool set)
    {
        questionPanel.gameObject.SetActive(set);
        questionButton1.gameObject.SetActive(set);
        questionButton2.gameObject.SetActive(set);
    }

    private void Update()
    {
        if(npcTalkCnt == 1 & firstTalk == false)
        {
            TalkNPC();
            firstTalk = true;
        }
        else if(npcTalkCnt == 2 )
        {
            QuestionSetActive(false);
            firstTalk = false;
        }

        if(isDialogue && count != 3)
        {
            if (dialogue[count].Equals("end"))
            {
                if(count<dialogue.Length)
                {
                    NextDialogue();
                }
            }
        }
    }
}
