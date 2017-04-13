package by.bsuir.lingvic.domain;

import javax.persistence.*;
import java.util.HashSet;

@Entity(name = "lingvo_set")
public class Set {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "set")
    private java.util.Set<Word> wordSet = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public java.util.Set<Word> getWordSet() {
        return wordSet;
    }

    public void setWordSet(java.util.Set<Word> wordSet) {
        this.wordSet = wordSet;
    }
}
